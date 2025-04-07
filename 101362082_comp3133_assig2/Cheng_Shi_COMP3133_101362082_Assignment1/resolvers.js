const User = require('./models/Users');
const Employee = require('./models/Employee');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ApolloError } = require('apollo-server-express');

// Define resolvers
const resolvers = {
    Query: {
      getAllEmployees: async () => {
        return await Employee.find();
      },
      searchEmployeeByEid: async (_, { eid }) => {
        return await Employee.findById(eid);
      },
      searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
        const query = {};
        if (designation) {
            query.designation = { $regex: designation, $options: 'i' };
        }
        if (department) {
            query.department = { $regex: department, $options: 'i' };
        }
        if (designation && department) {
            query.$or = [
                { designation: { $regex: designation, $options: 'i' } },
                { department: { $regex: department, $options: 'i' } }
            ];
        }
        return await Employee.find(query);
      }
    },
    Mutation: {
      signup: async (_, { username, email, password }) => {
          try {
              const existingUser = await User.findOne({ $or: [{ username }, { email }] });
              if (existingUser) {
                  throw new ApolloError('Username or email already taken', 'USER_ALREADY_EXISTS');
              }
              const hashedPassword = await bcrypt.hash(password, 10);
              const user = new User({ username, email, password: hashedPassword });
              await user.save();
              return user;
          } catch (error) {
              throw new ApolloError('Failed to create user', 'INTERNAL_SERVER_ERROR');
          }
      },
      login: async (_, { username, password }) => {
          const user = await User.findOne({ $or: [{ username }, { email: username }] });
          if (!user) {
              throw new ApolloError('Invalid credentials', 'INVALID_CREDENTIALS');
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
              throw new ApolloError('Invalid credentials', 'INVALID_CREDENTIALS');
          }
          const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
          return token;
      },
      addNewEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
          const newEmployee = new Employee({ first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo });
          await newEmployee.save();
          return newEmployee;
      },
      updateEmployeeByEid: async (_, { eid, ...updatedData }) => {
          const employee = await Employee.findByIdAndUpdate(eid, updatedData, { new: true });
          if (!employee) {
              throw new ApolloError('Employee not found', 'NOT_FOUND');
          }
          return employee;
      },
      deleteEmployeeByEid: async (_, { eid }) => {
          const result = await Employee.findByIdAndDelete(eid);
          if (!result) {
              throw new ApolloError('Employee not found', 'NOT_FOUND');
          }
          return true;
      }
  }
};

module.exports = { resolvers };