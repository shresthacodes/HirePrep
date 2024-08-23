/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://Hireprep_owner:ISL1PKXNzBM0@ep-tight-art-a1kz9xuw.ap-southeast-1.aws.neon.tech/Hireprep?sslmode=require',
  },
};
