import { Link } from 'react-router-dom'
import CustomCard from '../../components/custom-card/CustomCard'

export default function HomePage() {
  return (
    <div className='row justify-content-center'>
      <div className='col-sm-6'>
        <CustomCard>
          <div>Home</div>
          <div>
            <ul>
              <li>
                <Link to={'/client-side-table'}>Client side table example</Link>
              </li>
              <li>
                <Link to={'/server-side-table'}>Server side table example</Link>
              </li>
            </ul>
          </div>
        </CustomCard>
      </div>
    </div>
  )
}
