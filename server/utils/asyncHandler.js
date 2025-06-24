const asyncHandler = (fn, errorMessage = "Internal server error") => 
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error(`Error: ${error.message}`);
      if (!res.headersSent) {
        res.status(500).json({ error: errorMessage });
      } else {
        // Optionally log or pass to Express error handler
        console.warn("Response already sent. Skipping duplicate response.");
      }
    });

export default asyncHandler;
