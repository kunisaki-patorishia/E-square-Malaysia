// functions/submitForm.js
export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body);

  // Send request to Google Apps Script
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbxxeY930JfX1-YLmq__Br7Ev31rJEvLCAxehecxLQnNe94wq_19YxMeI_WDFiDh8kBuGA/exec",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }
  );

  const result = await response.text();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: result,
  };
}
