var svg = d3.select('svg');
var margin = 200;
var width = svg.attr('width') - margin;
var height = svg.attr('height') - margin;
// Mention the Scaling Range of X and Y
var xScale = d3.scaleBand().range([0, width]).padding(0.4);
var yScale = d3.scaleLinear().range([height, 0]);
// Create a General <g> Element in SVG
var g = svg.append("g").
    attr("transform", "translate(" + 100 + "," + 100 + ")");
// Use the CSV data to plot bar chart
d3.csv("data.csv").then(data => {
    xScale.domain(data.map(
        function (d) {
            //    console.log(d.state);
            return d.state;
        }
    ));
    yScale.domain([0, d3.max(data, function (d) {
        //    console.log(d.population);
        return d.population;
    })]);

    // X scale rendering
    g.append("g").
        attr('transform', 'translate(0,' + height + ')').
        call(d3.axisBottom(xScale)).
        append('text').
        attr('y', height - 230).
        attr('x', width - 300).
        attr('font-size', '2.2em').
        attr('text-anchor', 'end').
        attr('stroke', 'black').
        text("States");

    // Y scale rendering
    g.append("g").
        call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d;
        }).ticks(10)).
        append('text').
        attr('transform', 'rotate(-90)').
        attr('y', -100).
        attr('x', -50).
        attr('dy', '2em').
        attr('font-size', '2.2em').
        attr('text-anchor', 'end').
        attr('stroke', 'black').
        text('Population');

    // Creates Bar Charts...
    g.selectAll('.bar').
        data(data).
        enter().append('rect').
        attr('class', 'bar').
        attr('x', function (d) { return xScale(d.state); }).
        attr('y', function (d) { return yScale(d.population); }).
        attr('width', xScale.bandwidth()).
        attr('height', function (d) { return height - yScale(d.population); });
    init();
});
// window.addEventListener('load',init);
class BarValues {
    constructor(x, y, W, H) {
        this.x = x;
        this.y = y;
        this.W = W;
        this.H = H;
    }
}
function DrawPieChartbyD3(A,X,Y,id) {
    var data = [];
    for (var i = 0; i < A.length; i++) {
        data.push(A[i].H);
    }
    var X = X+120;
    var Y = Y; 
    console.log(data);
    var svg = d3.select('svg'),
        width = svg.attr('width'),
        height = svg.attr('height'),
        radius = 20,
        // radius = Math.min(width - 400, height - 400) / 2,
        g = svg.append('g').attr('transform', 'translate(' + X + ',' + Y + ')');
        // g = svg.append('g').attr('transform', 'translate(' + width / 4 + ',' + height / 5 + ')');

    console.log('SVG H : ',height,' SVG W : ',width);    
    var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00']);
    var pie = d3.pie();
    var arc;
    arc = d3.arc().
    innerRadius(5).
    outerRadius(radius);   
    for(var i=0;i<radius;i=i+2){
       
    }
    // var s=setInterval(
    //     function(){
         
    //     }
    // ,100);
    
    
    var label = d3.arc().
        outerRadius(20).
        innerRadius(15 );
    var arcs = g.selectAll('arc').
        data(pie(data)).
        enter().
        append('g').
        attr('class', 'arc').
        attr('id','p'+id.toString());

    arcs.append('path').
        attr('fill', function (d, i) {
            return color(i);
        }).
        transition().
        duration(2000).
        attr('d', arc);
    arcs.append('text').
        attr('transform', function (d) {
            return 'translate(' + label.centroid(d) + ')';
        }).
        attr('font-size','10px').
        text(function (d) {
            return d.data + '%';
        })

}
function DrawPieChart(X, Y, W, H, A,id) {
    console.log('in draw pie ', A, X, Y, W, H);
    var i1 = 0;
    let nA = A.find((d, i) => {

        if (d.x == X && d.y == Y && d.W == W && d.H == H) {
            console.log(d.x, d.y, d.W, d.H);
            i1 = i;
            return true;
        }
    });
    var New3ValuesArray = [];
    if (A[i1 - 1])
        New3ValuesArray.push(A[i1 - 1]);

    New3ValuesArray.push(A[i1]);

    if (A[i1 + 1])
        New3ValuesArray.push(A[i1 + 1]);
    console.log(New3ValuesArray);
    console.log(i1,id);
    DrawPieChartbyD3(New3ValuesArray,X,Y,id);
}
var isclickBar=false;
var pieid=-1;
function RemoveAllRemainingPieCharts(n){
    // if(document.getElementById ('p'+k)){
    //     console.log(k);
    //     document.getElementById ('p'+k).remove();  
    // }
  console.log('Pie id  : ',pieid);  
  for(var i=0;i<pieid;i++){
    //   g.select('#p'+i).remove();
    // console.log(document.getElementById ('p'+i));
    // if(i!=pieid){
        console.log('p'+i);
   
        if(document.getElementById ('p'+i)){
            // console.log('p'+i);
            // if(d3.select('#p'+i)['_groups'][0][0].outerHTML)
            // d3.select('#p'+i)['_groups'][0][0].outerHTML="";

            // console.log(d3.select('#p'+i)['_groups'][0][0].outerHTML);
            d3.select('#p'+i).remove();
        //     // var ele=document.getElementById ('p'+i);
        //     // ele.style.transform = 'translate(0,0)';
        //     // ele.parentNode.removeChild(ele);
            // document.getElementById ('p'+i).remove();  
        // }
     
    }
    
     
  }
  for(var i=pieid+1;i<n;i++){
    if(document.getElementById ('p'+i)){
        d3.select('#p'+i).remove();
        // console.log(typeof d3.select('#p'+i)['_groups'][0][0]);
        // delete d3.select('#p'+i)['_groups'][0][0];
        // if(d3.select('#p'+i)['_groups'][0][0].outerHTML)
        // d3.select('#p'+i)['_groups'][0][0].outerHTML="";
    }      
  } 
}
function ChangeColorToggling(BarClicked,Bars,n,x,y,w,h,A){
  
     for(var i=0;i<n;i++){
         if(Bars.item(i)==BarClicked){
            //  console.log(BarClicked);
             Bars.item(i).style.fill='yellow';

            //  Bars.item(i).style.stroke='green';
            //  Bars.item(i).style.strokeWidth='3';
            //  Bars.item(i).style.filter='url(#f2)';
            // Bars.item(i).style.boxShadow = '10px 10px 5px  rgba(0, 0, 0, .5)';
            DrawPieChart(x,y,w,h,A,i);
            pieid=i;
            
            // console.log(Bars .item(i).style);
            //  console.log(Bars.item(i));
         }
         else{
            // Bars.item(i).style.fill='chocolate';
            // Bars.item(i).style.boxShadow = "10px 10px 5px gray";
            // Bars.item(i).style.filter = 'url(#Bold)';
            Bars.item(i).style.filter = 'drop-shadow(-1px 3px 3px rgba(50, 50, 50, 0.6))';
            console.log(Bars.item(i).style);
            RemoveAllRemainingPieCharts(n);

         }
     }
   
}
function init() {
    var svg = document.getElementsByTagName('svg');
    console.log(svg);
    var g = document.getElementsByTagName('g');
    console.log(g);
    var lengthofBars = document.getElementsByTagName("rect").length;
   
    console.log(lengthofBars);
    var bars = document.getElementsByTagName("rect");
    console.log(bars);
    var ArrayofValues = [];
    for (var i = 0; i < lengthofBars; i++) {

        // console.log(bars.item(i).width.animVal.value);
        // console.log(bars.item(i).height.animVal.value);
        // console.log(bars.item(i).y.animVal.value);
        // console.log(bars.item(i).x.animVal.value);
        ArrayofValues.push(new BarValues(bars.item(i).x.animVal.value, bars.item(i).y.animVal.value, bars.item(i).width.animVal.value, bars.item(i).height.animVal.value));
    }
    console.log(ArrayofValues);
  
    for (var i = 0; i < lengthofBars; i++) {
      
        bars.item(i).addEventListener('click', function (d) {
          
            ChangeColorToggling(this,bars,lengthofBars,this.x.animVal.value, this.y.animVal.value, this.width.animVal.value, this.height.animVal.value, ArrayofValues);
            // RemoveAllRemainingPieCharts(lengthofBars);
        });
    }
}
