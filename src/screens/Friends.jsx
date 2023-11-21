import { 
  View, 
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity 
} from 'react-native'
import Cell from '../components/Cell'
import utils from '../core/utils'
import Empty from '../components/Empty'
import useGlobal from '../core/global'
import Thumbnail from '../components/Thumbnail'

function FriendRow({ navigation, item }) {
	return (
		<TouchableOpacity onPress={() => {
			navigation.navigate('Messages', item)
		}}>
			<Cell>
				<Thumbnail
					url={item.friend.thumbnail}
					size={66}
				/>
				<View
					style={{
						flex: 1,
						paddingHorizontal: 16
					}}
				>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 16,
							color: '#202020',
							marginBottom: 4
						}}
					>
						{item.friend.name}
					</Text>
					<Text
						style={{
							color: '#606060',
						}}
					>
						{item.preview} <Text style={{color: '#909090', fontSize: 13 }}>
							{utils.formatTime(item.updated)}
						</Text>
					</Text>
				</View>
			</Cell>
		</TouchableOpacity>
	)
}

const FriendScreen = ({navigation}) => {
  const friendList = useGlobal(state => state.friendList)

	// Show loading indicator
	if (friendList === null) {
		return  (
			<ActivityIndicator style={{ flex: 1 }} />
		)
	}

	// Show empty if no requests
	if (friendList.length === 0) {
		return (
			<Empty icon='inbox' message='No Links' />
		)
	}

	// Show request list
	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={friendList}
				renderItem={({ item }) => (
					<FriendRow navigation={navigation} item={item} />
				)}
				keyExtractor={item => item.id}
			/>
		</View>
	)
}

export default FriendScreen;