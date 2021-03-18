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
	]
}