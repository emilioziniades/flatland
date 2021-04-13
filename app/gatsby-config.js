/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
	siteMetadata: {
	    title: `Flatland`,
	    siteUrl: `https://www.flatland.gq`,
	    description: `Collaborative blockchain pixel art`,
	  },
  /* Your site config here */
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-remark`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
			  name: `images`,
			  path: `${__dirname}/src/images`,
			}
		  },
		{
			resolve: `gatsby-source-filesystem`,
			options: {
			  name: `content`,
			  path: `${__dirname}/src/content`,
			}
		  },
		  {
			resolve: `gatsby-plugin-manifest`,
			options: {
			  name: `Flatland Crypto Art`,
			  short_name: `Flatland`,
			  start_url: `/`,
			  icon: `src/images/favicon.png`, // This path is relative to the root of the site.
			},
		  },
	]
}