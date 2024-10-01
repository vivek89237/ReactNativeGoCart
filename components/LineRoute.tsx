import { ShapeSource, LineLayer } from "@rnmapbox/maps"

export default  function LineRoute({coordinates}){
    return (
        <ShapeSource 
            id="routeSource"
            lineMetrics
            shape={{
              properties:{},
              type: 'Feature',
              geometry:{
                type:'LineString',
                coordinates: coordinates,
              },
            }}
          >
            <LineLayer 
              id="exampleLineLayer"
              style={{
                lineColor :'#42A209',
                lineCap:"round",
                lineJoin:"round",
                lineWidth:7,
              }}
            />
          </ShapeSource>
        
    )
}