const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB (replace with your own MongoDB URL)
mongoose.connect('mongodb://127.0.0.1:27017/JewellerPlusTest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const planSchema = new Schema({
  name: String,
  paymentMode: String,
  amount: String,
});

const Plan = mongoose.model('Plan', planSchema);

app.use(bodyParser.json());

// Create an plan
app.post('/plans', async (req, res) => {
  console.log("----------", req.body);
  try {
    const newPlan = new Plan(req.body);
    const plan = await newPlan.save();
    res.status(201).json(plan);
  } catch (err) {
    console.log("err ", err);
    res.status(400).send(err);
  }
});

// Read all plans
app.get('/plans', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    console.log("err ", err);
    res.status(500).send(err);
  }
});

// Read a single plan by ID
app.get('/plans/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      res.status(404).send('Plan not found');
    } else {
      res.status(200).json(plan);
    }
  } catch (err) {
    console.log("err ", err);
    res.status(500).send(err);
  }
});

// Update an plan by ID
app.put('/plans/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) {
      res.status(404).send('Plan not found');
    } else {
      res.status(200).json(plan);
    }
  } catch (err) {
    console.log("err ", err);
    res.status(500).send(err);
  }
});

// Delete an plan by ID
app.delete('/plans/:id', async (req, res) => {
  console.log("aa ", req.params);
  try {
    const plan = await Plan.findByIdAndRemove(req.params.id);
    if (!plan) {
      res.status(404).send('Plan not found');
    } else {
      res.status(200).json(plan);
    }
  } catch (err) {
    console.log("err ", err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
