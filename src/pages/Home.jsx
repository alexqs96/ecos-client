import FormPost from '../components/FormPost.jsx';
import FriendsList from '../components/FriendsList.jsx';
import Posts from '../components/Posts.jsx';
import FriendsOnline from '../components/FriendsOnline.jsx';

function Home() {
  return (
    <div className='layout'>
      <aside>
        <FriendsList />
      </aside>
      <main>
        <FormPost />
        <Posts />
      </main>
      <aside>
        <FriendsOnline/>
      </aside>
    </div>
  )
}

export default Home
