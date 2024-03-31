import { PropsWithChildren } from 'react'
import { View } from 'react-native'

export const StopPropagation = ({ children }: PropsWithChildren) => {
	return (
		<View onStartShouldSetResponder={() => true} onTouchEnd={(e) => e.stopPropagation()}>
			{children}
		</View>
	)
}
