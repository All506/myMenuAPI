const express = require('express');
const { sequelize } = require('./models');
const securityRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/UserRoutes');
const restaurantRoutes = require('./routes/RestaurantRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(securityRoutes);
app.use('/user',userRoutes);
app.use('/restaurant',restaurantRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection with database established');

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server', err);
  }
})();