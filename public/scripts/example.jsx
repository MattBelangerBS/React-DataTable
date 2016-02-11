var Table = Reactable.Table;

var MyTable = React.createClass({
        loadCommentsFromServer: function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    console.log("got data");
                    console.log(data);
                    console.log(data[0]);
                    console.log(data.length);
                    
                    for(var i = 0;i<data.length;i++){
                        data[i].PowerKW = parseFloat(data[i].PowerKW);
                    }
                    console.log(data);
                    console.log(data[0]);
                    //Per Minute
                    var dataMin = [];
                    var startDate = "";
                    var intDate = "";
                    var tempCount = 0;
                    var tempSum = 0;
                    
                    for(var k = 0;k<data.length;k++){
                       if(k == 0){
                           intDate = data[k].Timestamp;
                            console.log(intDate);
                            console.log(data[k].Timestamp);
                           console.log('inloop')
                       }
                       
                       if(data[k].Timestamp == intDate){
                           tempSum += data[k].PowerKW;
                           tempCount++;
                           
                       }else{

                           var newData = tempSum / tempCount;
                           var obj = {
                               PowerKW: newData,
                               Timestamp: intDate   
                           }
                           dataMin.push(obj);
                           
                           intDate = data[k].Timestamp;
                           tempCount = 1;
                           tempSum = data[k].PowerKW
                       }
                       
                       
                    }

                    console.log(dataMin);
                    console.log(dataMin[0]);
                    //per hour
                    
                    var dataHour = [];
                    var startDateH = "";
                    var intDateH = "";
                    var tempCountH = 0;
                    var tempSumH = 0;
                    
                    //console.log((dataMin[0].Timestamp).slice(-2));
                    for(var z = 0;z<dataMin.length;z++){
                      
                      if(z==0){
                          intDateH = data[z].Timestamp;
                      }
                       if(((dataMin[z].Timestamp).slice(-2)) == "00"){
                           console.log("in it")
                           var newData = (tempSumH / tempCountH).toFixed(3);
                           var obj = {
                               PowerKW: newData,
                               Timestamp: intDateH  
                           }
                           dataHour.push(obj);
                           intDateH = dataMin[z].Timestamp;
                           tempCountH = 1;
                           tempSumH = dataMin[z].PowerKW

                       }else{
                           tempSumH += dataMin[z].PowerKW;
                           tempCountH++;
                       }                           
                    }

                  
                    console.log(dataHour[0]);

                    this.setState({data: dataHour});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
    },
    getInitialState: function(){
            return {data: []};
    },
    componentDidMount: function(){
        this.loadCommentsFromServer();
    },
    render: function(){
        return(
            <div className="commentBox">
                <h1>MyTable</h1>
                <Table className="table" data={this.state.data} itemsPerPage={30000} pageButtonLimit={30}/>
            </div>
            );
        }
    });
    
    ReactDOM.render(
        <MyTable url="/api/json"/>,
        document.getElementById('content')
);

