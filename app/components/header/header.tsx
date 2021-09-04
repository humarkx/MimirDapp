import React from 'react'
import { HeaderProps } from './header.props'
import { StyledHeader } from './header.styled'

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export const Header = (props: HeaderProps) => {
	return <StyledHeader {...props} />
}
