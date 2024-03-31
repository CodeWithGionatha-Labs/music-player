import { unknownArtistImageUri } from '@/constants/images'
import { screenPadding } from '@/constants/tokens'
import { artistNameFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useArtists } from '@/store/library'
import { defaultStyles, utilsStyles } from '@/styles'
import { Link } from 'expo-router'
import { useMemo } from 'react'
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { ScrollView } from 'react-native-gesture-handler'

const ItemSeparatorComponent = () => {
	return <View style={[utilsStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
}

const ArtistsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in artists',
		},
	})

	const artists = useArtists()

	const filteredArtists = useMemo(() => {
		if (!search) return artists

		return artists.filter(artistNameFilter(search))
	}, [artists, search])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<FlatList
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
					scrollEnabled={false}
					ItemSeparatorComponent={ItemSeparatorComponent}
					ListFooterComponent={ItemSeparatorComponent}
					ListEmptyComponent={
						<View>
							<Text>No artist found</Text>

							<FastImage
								source={{
									uri: unknownArtistImageUri,
									priority: FastImage.priority.normal,
								}}
								style={utilsStyles.emptyContentImage}
							/>
						</View>
					}
					data={filteredArtists}
					renderItem={({ item: artist }) => {
						return (
							<Link href={`/artists/${artist.name}`} asChild>
								<TouchableHighlight activeOpacity={0.8}>
									<View style={styles.artistItemContainer}>
										<View>
											<FastImage
												source={{
													uri: unknownArtistImageUri,
													priority: FastImage.priority.normal,
												}}
												style={styles.artistImage}
											/>
										</View>

										<View style={{ width: '100%' }}>
											<Text numberOfLines={1} style={styles.artistNameText}>
												{artist.name}
											</Text>
										</View>
									</View>
								</TouchableHighlight>
							</Link>
						)
					}}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})

export default ArtistsScreen
