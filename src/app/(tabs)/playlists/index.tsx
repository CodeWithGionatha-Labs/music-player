import { PlaylistsList } from '@/components/PlaylistsList'
import { screenPadding } from '@/constants/tokens'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { usePlaylists } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const PlaylistsScreen = () => {
	const router = useRouter()

	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playlists',
		},
	})

	const { playlists } = usePlaylists()

	const filteredPlaylists = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [playlists, search])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push(`/(tabs)/playlists/${playlist.name}`)
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
				}}
			>
				<PlaylistsList
					scrollEnabled={false}
					playlists={filteredPlaylists}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>
		</View>
	)
}

export default PlaylistsScreen
