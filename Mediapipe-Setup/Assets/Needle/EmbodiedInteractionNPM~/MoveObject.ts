import { Behaviour, GameObject, Vec2, Vec3, serializable } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";

// Documentation → https://docs.needle.tools/scripting

export class MoveObject extends Behaviour {

    @serializable()
    public sphereA: Vector3 = new Vector3(0, 125, 0);

    @serializable()
    public sphereB: Vector3 = new Vector3(1, 110, 0);

    @serializable(GameObject)
    public sphereBObj?: GameObject;
    

    start() {

    }

    public setObjectPosition(value: any) {
        this.sphereA = value;
    }

    public setObjectBPosition(value: any) {
        this.sphereB = value;
    }

    update() {

        this.gameObject.transform.position.y = this.sphereA.y;
        this.gameObject.transform.position.x = this.sphereA.x;
        
        if (this.sphereBObj) {
            this.sphereBObj.transform.position.y = this.sphereB.y;
            this.sphereBObj.transform.position.x = this.sphereB.x;
        }
    }
}