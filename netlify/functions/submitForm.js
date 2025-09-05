export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ result: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxxeY930JfX1-YLmq__Br7Ev31rJEvLCAxehecxLQnNe94wq_19YxMeI_WDFiDh8kBuGA/exec", // replace with your Apps Script URL
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = await response.json(); // parse Apps Script JSON

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result: "error", message: err.message }),
    };
  }
}
