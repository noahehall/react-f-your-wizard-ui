import React from 'react'

export default function GetComponentStyle (css) {
	return css
			? <style>{css}</style>
			: null
}