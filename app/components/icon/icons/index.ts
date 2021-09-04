import heyfinaIcons from './icons'

const IconsListTypes = heyfinaIcons.icons.map(icon => icon.properties.name)

export type IconType = typeof IconsListTypes[number]
