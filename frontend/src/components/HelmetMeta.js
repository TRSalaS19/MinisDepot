import React from 'react'
import {Helmet} from 'react-helmet';

const HelmetMeta = ({ title, description, keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

HelmetMeta.defaultProps = {
  title: 'Welcome to Mini\'s Depot | Home',
  description: "Clothes for small puppies and dogs",
  keywords: 'puppy clothes mini chihuahua'
}
 
export default HelmetMeta
