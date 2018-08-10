import React from 'react';

/**
 * A single Step in the Wizard Component
 * @param       {[type]} props object containing css string and Component to be rendered
 * @param {String} props.css Any valid CSS
 * @param {Component} props.children Any valid React markup
 * @constructor
 */
export default function Step (props) {
  return (
    props.css
      ? <div><style>{`${props.css}`}</style>{props.children}</div>
      : <div>{props.children}</div>
  )
}
