exports.handler = async (event) => {
  console.log("=== ADMIN AUTH FUNCTION START ===");
  console.log("Event method:", event.httpMethod);
  console.log("Event body:", event.body);
  console.log("Environment variables:", {
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? "SET" : "NOT SET",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
    DESTINATION_EMAIL: process.env.DESTINATION_EMAIL ? "SET" : "NOT SET"
  });

  if (event.httpMethod !== "POST") {
    console.log("Method not allowed:", event.httpMethod);
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { password } = JSON.parse(event.body);
    console.log("Received password:", password ? "PROVIDED" : "NOT PROVIDED");
    console.log("Expected password:", process.env.ADMIN_PASSWORD);

    if (password === process.env.ADMIN_PASSWORD) {
      console.log("Authentication successful");
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true, 
          token: "admin-token-12345",
          message: "Connexion réussie" 
        })
      };
    } else {
      console.log("Authentication failed - password mismatch");
      return {
        statusCode: 401,
        body: JSON.stringify({ 
          success: false, 
          message: "Mot de passe incorrect" 
        })
      };
    }
  } catch (error) {
    console.error("Error in admin auth:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: "Erreur de connexion" 
      })
    };
  }
};
