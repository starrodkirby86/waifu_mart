import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Don't pay attention to this.

export const WaifuPreview = (props) => (
  <Link
    to={`/view/${this.props.waifu.id}`}>
    {this.props.waifu.name}
  </Link>
);

WaifuPreview.propTypes = {
  waifu: PropTypes.object,
};

export default WaifuPreview;