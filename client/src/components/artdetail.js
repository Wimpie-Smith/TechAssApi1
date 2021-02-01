import React,{Component} from 'react';
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'

class ArtistDetail extends Component{
    

    state ={
        artistId : '',
        array :[],
        top:[],
        albums:[],
        response: '',
    }
    
    componentWillMount() {
      
        this.callApi();
        this.callApiTop();
        this.callAlbums();
         
      };

  callApi= async e => {
    const response = await fetch('http://localhost:5000/artistDetail', {
      method: 'POST',
      headers: {
           
        'Content-Type': 'application/json',
      },
     
      body: JSON.stringify({ post: window.location.pathname.split('/')[2]}),
    });
    const body = await response.text();
    
    this.setState({ array: JSON.parse(body) });
  
}

callApiTop= async e => {
  const response = await fetch('http://localhost:5000/artistDetailTop', {
    method: 'POST',
    headers: {
         
      'Content-Type': 'application/json',
    },
   
    body: JSON.stringify({ post: window.location.pathname.split('/')[2]}),
  });
  const body = await response.text();
  
  this.setState({ top: JSON.parse(body) });

}


callAlbums= async e => {
  const response = await fetch('http://localhost:5000/artistAlbums', {
    method: 'POST',
    headers: {
         
      'Content-Type': 'application/json',
    },
   
    body: JSON.stringify({ post: window.location.pathname.split('/')[2]}),
  });
  const body = await response.text();
  
  this.setState({ albums: JSON.parse(body) });

}


    renderArtist = () => {
        const {array} = this.state;
        return array && array.length ?
        array.map((item,index) =>(
            <div key={index}  className="col-md-10 mb6">
            <div className="card border-primary">
             <img src={array[0].picture_big} alt="" className="card-img-top"/>
             <div className="card-body">
               <div className="card-title text-light">
                 {array[0].name}
               </div>
               <span className="text-light">No Fans: {array[0].nb_fan}</span>
             </div>
          
            </div>
    
        </div>
         ))
         : null;
       }

       renderTopTrack = () => {
        const {top} = this.state;
        console.log(top)
        return top.data && top.data.length ?
        top.data.map((item,index) =>(
            <div key={index}  className="">
                <span className="text-light"> {top.data[index].title}</span>
        </div>
       
         ))
         : null;
       }


       renderAlbums = () => {
        const {albums} = this.state;
        console.log(albums[0])
        return albums[0] && albums[0].length ?
        albums[0].map((item,index) =>(
            <div key={index}  className="">
                <span className="text-light"> {albums[0][index].title}</span>
        </div>
         ))
         : null;
       }

       

    render(){
        return(
             <div className = "container">
                 <a href="/"> <button className="btn text-light"><i className="fa fa-search float-left"></i>Search More Artist</button></a>
               <div className="row">
               <div className = "col">
                    
                          {this.renderArtist()}
                      </div>
                    
                     <div className = "col">
                     <div className="card border-primary">
                     <div className="art">
                         <p className="text-light">Top 5 Track List</p>
                         {this.renderTopTrack()}
                          </div>
                     </div>
                     </div>
                     <div className = "col">
                     <div className="card border-primary">
                       
                       <div className="art">
                       <p className="text-light">Album List</p>
                      {this.renderAlbums()}
                      </div>
                      </div>     
                    </div>
                 </div>
               </div> 
            )
            }
}

export default ArtistDetail;