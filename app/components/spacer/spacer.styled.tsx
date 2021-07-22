import styled from 'styled-components/native'
import { SpacerProps } from './spacer.props'

export const StyledSpace = styled.View<SpacerProps>`
	margin: ${({ theme, space }) => `${theme.spacing[space] ?? theme.spacing.tiny}px`};
`
