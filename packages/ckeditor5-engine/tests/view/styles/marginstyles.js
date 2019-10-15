/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import Styles from '../../../src/view/styles';

describe( 'Margin styles normalizer', () => {
	let styles;

	beforeEach( () => {
		styles = new Styles();
	} );

	it( 'should set all margins (1 value defined)', () => {
		styles.setStyle( 'margin:1px;' );

		expect( styles.getNormalized( 'margin' ) ).to.deep.equal( {
			top: '1px',
			right: '1px',
			bottom: '1px',
			left: '1px'
		} );
	} );

	it( 'should set all margins (2 values defined)', () => {
		styles.setStyle( 'margin:1px .34cm;' );

		expect( styles.getNormalized( 'margin' ) ).to.deep.equal( {
			top: '1px',
			right: '.34cm',
			bottom: '1px',
			left: '.34cm'
		} );
	} );

	it( 'should set all margins (3 values defined)', () => {
		styles.setStyle( 'margin:1px .34cm 90.1rem;' );

		expect( styles.getNormalized( 'margin' ) ).to.deep.equal( {
			top: '1px',
			right: '.34cm',
			bottom: '90.1rem',
			left: '.34cm'
		} );
	} );

	it( 'should set all margins (4 values defined)', () => {
		styles.setStyle( 'margin:1px .34cm 90.1rem thick;' );

		expect( styles.getNormalized( 'margin' ) ).to.deep.equal( {
			top: '1px',
			right: '.34cm',
			bottom: '90.1rem',
			left: 'thick'
		} );
	} );

	it( 'should output inline style (1 value defined)', () => {
		styles.setStyle( 'margin:1px;' );

		expect( styles.getInlineStyle() ).to.equal( 'margin:1px;' );
		expect( styles.getInlineProperty( 'margin' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-top' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-right' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-bottom' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-left' ) ).to.equal( '1px' );
	} );

	it( 'should output inline style (2 values defined)', () => {
		styles.setStyle( 'margin:1px .34cm;' );

		expect( styles.getInlineStyle() ).to.equal( 'margin:1px .34cm;' );
		expect( styles.getInlineProperty( 'margin' ) ).to.equal( '1px .34cm' );
		expect( styles.getInlineProperty( 'margin-top' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-right' ) ).to.equal( '.34cm' );
		expect( styles.getInlineProperty( 'margin-bottom' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-left' ) ).to.equal( '.34cm' );
	} );

	it( 'should output inline style (3 values defined)', () => {
		styles.setStyle( 'margin:1px .34cm 90.1rem;' );

		expect( styles.getInlineStyle() ).to.equal( 'margin:1px .34cm 90.1rem;' );
		expect( styles.getInlineProperty( 'margin' ) ).to.equal( '1px .34cm 90.1rem' );
		expect( styles.getInlineProperty( 'margin-top' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-right' ) ).to.equal( '.34cm' );
		expect( styles.getInlineProperty( 'margin-bottom' ) ).to.equal( '90.1rem' );
		expect( styles.getInlineProperty( 'margin-left' ) ).to.equal( '.34cm' );
	} );

	it( 'should output inline style (3 values defined, only last different)', () => {
		styles.setStyle( 'margin:1px 1px 90.1rem;' );

		expect( styles.getInlineStyle() ).to.equal( 'margin:1px 1px 90.1rem;' );
		expect( styles.getInlineProperty( 'margin' ) ).to.equal( '1px 1px 90.1rem' );
		expect( styles.getInlineProperty( 'margin-top' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-right' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-bottom' ) ).to.equal( '90.1rem' );
		expect( styles.getInlineProperty( 'margin-left' ) ).to.equal( '1px' );
	} );

	it( 'should output inline style (4 values defined)', () => {
		styles.setStyle( 'margin:1px .34cm 90.1rem thick;' );

		expect( styles.getInlineStyle() ).to.equal( 'margin:1px .34cm 90.1rem thick;' );
		expect( styles.getInlineProperty( 'margin' ) ).to.equal( '1px .34cm 90.1rem thick' );
		expect( styles.getInlineProperty( 'margin-top' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-right' ) ).to.equal( '.34cm' );
		expect( styles.getInlineProperty( 'margin-bottom' ) ).to.equal( '90.1rem' );
		expect( styles.getInlineProperty( 'margin-left' ) ).to.equal( 'thick' );
	} );

	it( 'should output inline style (4 values defined, only last different)', () => {
		styles.setStyle( 'margin:1px 1px 1px thick;' );

		expect( styles.getInlineStyle() ).to.equal( 'margin:1px 1px 1px thick;' );
		expect( styles.getInlineProperty( 'margin' ) ).to.equal( '1px 1px 1px thick' );
		expect( styles.getInlineProperty( 'margin-top' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-right' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-bottom' ) ).to.equal( '1px' );
		expect( styles.getInlineProperty( 'margin-left' ) ).to.equal( 'thick' );
	} );

	describe( 'margin-*', () => {
		it( 'should set proper margin', () => {
			styles.setStyle( 'margin-top:1px;' );

			expect( styles.getNormalized( 'margin' ) ).to.deep.equal( { top: '1px' } );
			expect( styles.getNormalized( 'margin-top' ) ).to.equal( '1px' );
		} );

		it( 'should merge margin with margin shorthand', () => {
			styles.setStyle( 'margin: 2em;margin-top:1px;' );

			expect( styles.getNormalized( 'margin' ) ).to.deep.equal( {
				top: '1px',
				right: '2em',
				bottom: '2em',
				left: '2em'
			} );
			expect( styles.getNormalized( 'margin-top' ) ).to.equal( '1px' );
			expect( styles.getNormalized( 'margin-right' ) ).to.equal( '2em' );
			expect( styles.getNormalized( 'margin-bottom' ) ).to.equal( '2em' );
			expect( styles.getNormalized( 'margin-left' ) ).to.equal( '2em' );
		} );

		it( 'should output margin-top', () => {
			styles.setStyle( 'margin-top:1px;' );

			expect( styles.getInlineStyle() ).to.equal( 'margin-top:1px;' );
			expect( styles.getInlineProperty( 'margin-top' ) ).to.equal( '1px' );
		} );

		it( 'should output margin-right', () => {
			styles.setStyle( 'margin-right:1px;' );

			expect( styles.getInlineStyle() ).to.equal( 'margin-right:1px;' );
			expect( styles.getInlineProperty( 'margin-right' ) ).to.equal( '1px' );
		} );

		it( 'should output margin-bottom', () => {
			styles.setStyle( 'margin-bottom:1px;' );

			expect( styles.getInlineStyle() ).to.equal( 'margin-bottom:1px;' );
			expect( styles.getInlineProperty( 'margin-bottom' ) ).to.equal( '1px' );
		} );

		it( 'should output margin-left', () => {
			styles.setStyle( 'margin-left:1px;' );

			expect( styles.getInlineStyle() ).to.equal( 'margin-left:1px;' );
			expect( styles.getInlineProperty( 'margin-left' ) ).to.equal( '1px' );
		} );
	} );
} );
