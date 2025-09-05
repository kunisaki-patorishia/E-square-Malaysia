// functions/submitForm.js
export async function handler(event, context) {
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ result: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Forward request to Google Apps Script Web App
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzuyN6e3vjC1_DztRFoovkY3IBNN0HNHRdseh1FPbTbAkzri0b4JPe5MiXxZpLBLNdTew/exec",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ result: "error", message: err.message }),
    };
  }
}
