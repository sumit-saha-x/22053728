const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const API_BASE_URL = "http://20.244.56.144/evaluation-service";

const numberTypes = {
  p: "primes",
  f: "fibo",
  e: "even",
  r: "rand",
};

const numberWindow = [];

const fetchNumbers = async (type) => {
  try {
    const source = axios.CancelToken.source();
    setTimeout(() => source.cancel(), 500); // Cancel request if it takes >500ms

    const response = await axios.get(${API_BASE_URL}/${numberTypes[type]}, {
      cancelToken: source.token,
    });
    return response.data.numbers || [];
  } catch (error) {
    return []; // Ignore errors and timeouts
  }
};

app.get("/numbers/:numberid", async (req, res) => {
  const { numberid } = req.params;
  if (!numberTypes[numberid]) {
    return res.status(400).json({ error: "Invalid number type." });
  }

  const prevState = [...numberWindow];
  const newNumbers = await fetchNumbers(numberid);

  newNumbers.forEach((num) => {
    if (!numberWindow.includes(num)) {
      if (numberWindow.length >= WINDOW_SIZE) {
        numberWindow.shift(); // Remove oldest number
      }
      numberWindow.push(num);
    }
  });

  const avg =
    numberWindow.length > 0
      ? (numberWindow.reduce((sum, num) => sum + num, 0) / numberWindow.length).toFixed(2)
      : 0;

  res.json({
    windowPrevState: prevState,
    windowCurrState: numberWindow,
    numbers: newNumbers,
    avg: parseFloat(avg),
  });
});

app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
  });