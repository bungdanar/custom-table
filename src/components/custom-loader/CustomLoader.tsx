import { Bars } from 'react-loader-spinner'

interface CustomLoaderProps {
  size?: number
  color?: string
}

const CustomLoader = ({
  size = 22,
  color = 'green',
}: CustomLoaderProps): JSX.Element => {
  return <Bars color={color} height={size} width={size} />
}

export default CustomLoader
