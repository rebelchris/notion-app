require('dotenv').config();
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

module.exports = {
  getDatabase: async () => {
    const response = await notion.databases.query({ database_id: databaseId });

    return response.results.map((page) => {
      return {
        id: page.id,
        name: page.properties.Name.title[0]?.plain_text,
        tags: page.properties.Tags.multi_select.map((tag) => tag.name),
        watched: page.properties.Watched.checkbox,
        banner: page.properties.Banner.files[0].external.url,
      };
    });
  },
};
