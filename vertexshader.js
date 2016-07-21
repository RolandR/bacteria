var vertexShader = `

attribute vec2 coordinates;

//attribute vec4 aVertexColor;
//varying lowp vec4 vColor;

uniform vec2 canvasSize;

varying vec2 texCoord;

void main(void){
	
	texCoord = coordinates/2.0 + 0.5;
	float aspect = canvasSize.x/canvasSize.y;
	float scale = canvasSize.y / 512.0;
	
	texCoord.x = texCoord.x * aspect;
	texCoord = texCoord.xy * scale;

	//vColor = aVertexColor.xyzw;
	
	gl_Position = vec4(coordinates.xy, 1.0, 1.0);

}

`;
