var svg = d3.select('svg');
var margin = 200;
var width = svg.attr('width') - margin;
var height = svg.attr('height') - margin;
var xScale = d3.scaleBand().range([0, width]).padding(0.4);
var yScale = d3.scaleLinear().range([height, 0]);
var g = svg.append("g").
    attr("transform", "translate(" + 100 + "," + 100 + ")");
d3.csv("data.csv").then(data => {
    //    if(err){
    //        console.log(err);
    //        throw err;
    //    }
    //    console.log(data);
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
function DrawPieChartbyD3(A){
   var data=[];
   for(var i=0;i<A.length;i++){
       data.push(A[i].H);
   }
   console.log(data);
   var svg = d3.select('svg'),
   width = svg.attr('width'),
   height = svg.attr('height'),
   radius = Math.min(width-300,height-300)/2,
   g = svg.append('g').attr('transform','translate('+width/4+','+height/5+')');

   var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00']);
   var pie = d3.pie();
   var arc = d3.arc().
                innerRadius(0).
                outerRadius(radius);
   var label = d3.arc().
                  outerRadius(radius).
                  innerRadius(radius-80);
   var arcs = g.selectAll('arc').
                data(pie(data)).
                enter().
                append('g').
                attr('class','arc');

   arcs.append('path').
                attr('fill',function(d,i){
                return color(i);
                }).
                attr('d',arc);
   arcs.append('text').
        attr('transform',function(d){
            return 'translate('+label.centroid(d)+')';
        }).
        text(function(d){
            return d.data+'%';
        })

}
function DrawPieChart(X,Y,W,H,A){
   console.log('in draw pie ',A,X,Y,W,H);
   var i1=0;
   let nA= A.find((d,i)=>{
       
       if(d.x==X && d.y==Y && d.W==W && d.H==H){
           console.log(d.x,d.y,d.W,d.H);
           i1=i;
           return true;
       }
   });
   var New3ValuesArray = [];
   if(A[i1-1])
   New3ValuesArray.push(A[i1-1]);
   
   New3ValuesArray.push(A[i1]);
   
   if(A[i1+1])
   New3ValuesArray.push(A[i1+1]);
   console.log(New3ValuesArray);
   console.log(i1);
   DrawPieChartbyD3(New3ValuesArray);
}
function init() {
    var svg = document.getElementsByTagName('svg');
    console.log(svg);
    var g = document.getElementsByTagName('g');
    console.log(g);
    var lengthofBars = document.getElementsByTagName("rect").length;
    // console.log(typeof bars);
    // console.log(bars.item(0));
    // console.log(bars.namedItem('rect'));
    console.log(lengthofBars);
    var bars = document.getElementsByTagName("rect");
    console.log(bars);
    var ArrayofValues = [];
    for (var i = 0; i < lengthofBars; i++) {
  
        // console.log(bars.item(i).width.animVal.value);
        // console.log(bars.item(i).height.animVal.value);
        // console.log(bars.item(i).y.animVal.value);
        // console.log(bars.item(i).x.animVal.value);
        ArrayofValues.push(new BarValues(bars.item(i).x.animVal.value,bars.item(i).y.animVal.value,bars.item(i).width.animVal.value,bars.item(i).height.animVal.value)); 
    } 
    console.log(ArrayofValues);

    for (var i = 0; i < lengthofBars; i++) {
        // console.log(bars.item(i));
        // console.log(bars.item(i).width.animVal.value);
        // console.log(bars.item(i).height.animVal.value);
        // console.log(bars.item(i).y.animVal.value);
        // console.log(bars.item(i).x.animVal.value);
        // console.log(bars.item(i).attributes);
        bars.item(i).addEventListener('click', function (d) {
            // console.log(d);
            // console.log('clicked to bar',d.x,d.y);
            // console.log(this.x,this.y);
            console.log(this.x.animVal.value);
            console.log(this.y.animVal.value);
            console.log(this.height.animVal.value);
            console.log(this.width.animVal.value);
            DrawPieChart(this.x.animVal.value,this.y.animVal.value,this.width.animVal.value,this.height.animVal.value,ArrayofValues);
        });
    }
}
