const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());

app.get("/download", (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send("Video URL required");
  }

  const ytDlpPath = path.join(__dirname, "yt-dlp.exe");
  const command = `"${ytDlpPath}" -f best -o "%(title)s.%(ext)s" "${videoUrl}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ ERROR:\n", stderr || error.message);
      return res.status(500).send(`Download failed: ${stderr || error.message}`);
    }

    console.log("✅ STDOUT:\n", stdout);
    res.send("✅ Download successful!");
  });
});

app.listen(3001, () => {
  console.log("🚀 Server running at http://localhost:3001");
});
