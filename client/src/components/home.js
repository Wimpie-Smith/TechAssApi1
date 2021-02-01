import react, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
  state={
    post: '',
    albums : [],
}

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/searchArtist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({albums: JSON.parse(body)});
  
}


   renderAlbums = () => {
                const {albums} = this.state;
                console.log(albums[0]);
                return albums[0] && albums[0].length ?
                  albums[0].map((item,index) =>(
                    <div key={index} className="col-md-4 mb2">
                    <div className="card border-primary">
                    <Link to={`/details/${item.artist.id}`} className='link'>  <img src={item.album.cover_big} alt="" className="card-img-top"/></Link>
                     <div className="card-body">
                         <span className="text-light">{item.artist.name}</span>
                       <div className="card-title text-light">
                         {item.title}
                       </div>
                      
                     </div>
                
                    </div>

                </div>
                  ))
                : null;
              }

render(){

  return(
    <div className="container">
      <div className="">
  
      </div>
    <div class="row mt-4">
             <div className="col-md-10 mx-auto">
 
        <div className="form-group has-search">
    <span className="fa fa-search form-control-feedback"></span>
    <form onSubmit={this.handleSubmit}>
         <input type="text"
         className="form-control" 
         placeholder="Search"
         value={this.state.post}
         onChange={e => this.setState({ post: e.target.value })}
        />
    </form>
 
  </div>
  <div className="row">
     {this.renderAlbums()}
  </div>

 </div>
 </div>
 </div>
  );
}
}


export default Home;