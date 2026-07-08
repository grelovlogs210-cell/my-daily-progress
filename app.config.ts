import "dotenv/config";
import type { ExpoConfig } from "expo/config";

const appJson = require("./app.json");

export default (): ExpoConfig => ({
  ...appJson.expo,
});
