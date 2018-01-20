/**
 * External dependencies
 */
import { assign, compact } from 'lodash';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Filters registered block settings, extending attributes with layout.
 *
 * @param   {Object} settings Original block settings.
 * @returns {Object}          Filtered block settings.
 */
export function addAttribute( settings ) {
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		layout: {
			type: 'string',
		},
	} );

	return settings;
}

/**
 * Override props assigned to save component to inject layout class. This is
 * only applied if the block's save result is an element and not a markup
 * string.
 *
 * TODO: Markup string should support layouting. Options:
 *  - Wrap the returned string if layout is assigned.
 *  - Drop support for raw string HTML in favor of <Raw> component.
 *
 * @param   {Object} extraProps Additional props applied to save element.
 * @param   {Object} blockType  Block type.
 * @param   {Object} attributes Current block attributes.
 * @returns {Object}            Filtered props applied to save element.
 */
export function addSaveProps( extraProps, blockType, attributes ) {
	const { layout } = attributes;
	if ( layout ) {
		extraProps.className = compact( [
			extraProps.className,
			'layout-' + layout,
		] ).join( ' ' );
	}

	return extraProps;
}

addFilter( 'blocks.registerBlockType', 'core/anchor/attribute', addAttribute );
addFilter( 'blocks.getSaveContent.extraProps', 'core/anchor/save-props', addSaveProps );
