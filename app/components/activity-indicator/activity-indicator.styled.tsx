import styled from 'styled-components/native'

export const StyledActivityIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
	size: 'large',
	color: theme.colors.secondary,
}))`
	flex: 1;
`
