import mimirIcons from './icons'

const IconsListTypes = mimirIcons.icons.map(icon => icon.properties.name)

export type IconType = typeof IconsListTypes[number]
