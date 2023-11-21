import { 
  ActivityIndicator, 
  FlatList,
  TouchableOpacity, 
  View, 
  Text 
} from 'react-native'
import useGlobal from '../core/global'
import Empty from '../components/Empty'
import Cell from '../components/Cell'
import Thumbnail from '../components/Thumbnail'
import utils from '../core/utils'

function RequestAccept({ item }) {
  const requestAccept = useGlobal(state => state.requestAccept)
  
  return(
    <TouchableOpacity
      style={{
        backgroundColor: '#202020',
        paddingHorizontal: 14,
        height: 36,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => requestAccept(item.sender.username)}
    >
      <Text style={{ color: 'white', fontWeight: 'bold'}}>Link</Text>
    </TouchableOpacity>
  )
}

function RequestRow({ item }) {
  const message = 'Requested to link with you'
  return(
    <Cell>
      <Thumbnail 
        url={item.sender.thumbnail}
        size={76}
      />
      <View style={{
        flex: 1,
        paddingHorizontal: 16,
      }}>
        <Text
					style={{
						fontWeight: 'bold',
						color: '#202020',
						marginBottom: 4
					}}
				>
				{item.sender.name}
				</Text>
				<Text
					style={{
						color: '#606060',
					}}
				>
				{message} <Text style={{color: '#909090', fontSize: 13 }}>
          {utils.formatTime(item.created)}
          </Text>
				</Text>
      </View>
      <RequestAccept item={item}/>
    </Cell>

  )
}


const RequestScreen = () => {
  const requestList = useGlobal(state => state.requestList)

  if (requestList === null) {
    return(
      <ActivityIndicator style={{ flex: 1 }} />
    )
  }

  // Show empty if no request
  if (requestList.length === 0) {
    return(
      <Empty icon='bell' message='No requests' /> 
    )
  }

  // Show request list
  return (
    <View style={{ flex: 1 }}>
        <FlatList
          data={requestList}
          renderItem={({item}) => (
            <RequestRow item={item} />
          )}
          keyExtractor={item => item.sender.username}
        />
    </View>
  )
}

export default RequestScreen