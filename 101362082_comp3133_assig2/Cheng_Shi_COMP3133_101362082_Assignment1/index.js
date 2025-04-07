const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require("apollo-server-express");
const authRoutes = require('./routes/auth');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const app = express();
// require('dotenv').config();


// Connect to MongoDB
mongoose.connect('mongodb+srv://heatherchengshi:gs5pfzRM2TD8tMan@cluster0.f4tb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected successful'))
  .catch(err => console.log(err));

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  introspection: true,
  playground: true,
  
  // context: ({ req }) => {
  //   const authHeader = req.headers.authorization || '';
  //   const token = authHeader.split(' ')[1];
  //   if (token) {
  //       try {
  //           const decoded = jwt.verify(token, process.env.JWT_SECRET);   
  //           return { userId: decoded.userId };
  //       } catch (error) {
  //           console.error('JWT Verification Error:', error);
  //       }
  //   }
  //   return {};
  // }
});

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

async function startServer() {
  // Make sure to await server.start()
  await server.start();

  // Now you can apply the middleware
  server.applyMiddleware({ app, path: '/graphql' });

  // Start the server
  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });

}

// Call the startServer function to start everything
startServer();
