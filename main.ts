class Point{
    x:number
    y:number
    constructor(x:number,y:number){
        this.x=x
        this.y=y
    }
}

let points:Point[][]=[]

function create() {
    for (let c = 0; c < 5; c++) {
        points[c]=[]
        for (let r = 0; r < 5; r++) {
            points[c][r]=new Point(c-2,2-r)
            led.plotBrightness(c, r, (points[c][r].y < 0) ? 255 : 0)
        }
    }
}
function getAngle() {
    let x = input.acceleration(Dimension.X)
    let y = input.acceleration(Dimension.Y)
    if (x > 1023) x = 1023
    if (x < -1023) x = -1023
    if (y > 1023) y = 1023
    if (y < -1023) y = -1023
    let ac = Math.acos(x / 1024)
    let as = Math.asin(y / 1024)
    if (x > 0) {
        if (y > 0) return (ac + as) / 2
        ac = 2 * Math.PI - ac
        as = 2 * Math.PI + as
        return (ac + as) / 2
    }
    if (y > 0) {
        as = Math.PI - as
        return (ac + as) / 2
    }
    ac = 2 * Math.PI - ac
    as = Math.PI - as
    return (ac + as) / 2
}

function rotate(a:number){
    let p: Point
    let cA=Math.cos(a)
    let sA=Math.sin(a)
    for(let c=0;c<5;c++){
        for (let r=0; r<5; r++) {
            let x=points[c][r].x
            let y=points[c][r].y
            p = new Point(x*cA-y*sA,x*sA+y*cA)
            led.plotBrightness(c,r,(p.y<0)?255:0)
        }
    }
}

create()

basic.forever(function () {
    basic.pause(300)
    let a=getAngle()
    rotate(a-Math.PI/2)
})
