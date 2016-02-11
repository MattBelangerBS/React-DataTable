var dataArray = 
        [{
            data:15.26,
            date:'Mon'
        },
        {
            data:15.55,
             date:'Tue'
        },
         {
            data:3.26,
             date:'Wed'
        },
         {
            data:10.2,
             date:'Thr'
        },
         {
            data:1.26,
             date:'Fri'
        },
         {
            data:13,
             date:'Sat'
        },
         {
            data:16.66,
             date:'Sun'
        }
        ]


var Table = Reactable.Table;

var MyTable = React.createClass({
    render:function(){
        return(
            <Table className="table" data={this.props.data}/>
        )
    }
});

    
    ReactDOM.render(
        <MyTable data={dataArray} />,
        document.getElementById('content')
);

