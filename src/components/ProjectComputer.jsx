import React, { useRef, useMemo, useContext, createContext } from "react";
import { useGLTF, Merged, useAnimations } from "@react-three/drei";

const context = createContext();
export function Instances({ children, ...props }) {
  const { nodes } = useGLTF("/models/computer-desk-area.glb");
  const instances = useMemo(
    () => ({
      Object: nodes.Object_4,
      Object1: nodes.Object_6,
      Object2: nodes.Object_8,
      Object3: nodes.Object_9,
      Object4: nodes.Object_11,
      Object5: nodes.Object_13,
      Object6: nodes.Object_15,
      Object7: nodes.Object_17,
      Object8: nodes.Object_18,
      Object9: nodes.Object_20,
      Object10: nodes.Object_22,
      Object11: nodes.Object_24,
      Object12: nodes.Object_30,
      Object13: nodes.Object_31,
    }),
    [nodes]
  );
  return (
    <Merged meshes={instances} {...props}>
      {(instances) => (
        <context.Provider value={instances} children={children} />
      )}
    </Merged>
  );
}

const ProjectComputer = (props) => {
  const instances = useContext(context);
  const group = useRef();
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Body108_0"
                position={[-0.724, 1.013, 0.657]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <instances.Object name="Object_4" />
              </group>
              <group
                name="Cube_1"
                position={[-0.724, 1.013, 0.762]}
                scale={0.092}
              >
                <instances.Object1 name="Object_6" />
              </group>
              <group
                name="MONITOR_4"
                position={[0.048, 0.928, 0.305]}
                scale={0.605}
              >
                <instances.Object2 name="Object_8" />
                <instances.Object3 name="Object_9" />
              </group>
              <group
                name="TABLE_5"
                position={[0.048, -0.002, 0.572]}
                scale={0.605}
              >
                <instances.Object4 name="Object_11" />
              </group>
              <group
                name="KEYBOARD_6"
                position={[-0.087, 0.954, 0.727]}
                scale={0.605}
              >
                <instances.Object5 name="Object_13" />
              </group>
              <group name="MOUSE_7" position={[0.423, 0.928, 0.831]}>
                <instances.Object6 name="Object_15" />
              </group>
              <group
                name="Cylinder002_8"
                position={[0.011, 0.442, 1.214]}
                scale={[0.026, 0.245, 0.026]}
              >
                <instances.Object7 name="Object_17" />
                <instances.Object8 name="Object_18" />
              </group>
              <group
                name="Cylinder003_9"
                position={[0.011, 0.442, 1.214]}
                scale={[0.026, 0.245, 0.026]}
              >
                <instances.Object9 name="Object_20" />
              </group>
              <group
                name="Cylinder007_10"
                position={[0.011, 0.442, 1.214]}
                scale={[0.026, 0.245, 0.026]}
              >
                <instances.Object10 name="Object_22" />
              </group>
              <group
                name="MONITOR001_11"
                position={[0.808, 1.239, 0.49]}
                scale={0.605}
              >
                <instances.Object11 name="Object_24" />
              </group>
              <group
                name="rig_CharRoot_43"
                position={[0, -0.199, 1.224]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={0.01}
              >
                <group
                  name="bip_42"
                  position={[0, 92.405, -1.666]}
                  rotation={[0, -1.571, 0]}
                >
                  <group name="GLTF_created_0">
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                    <instances.Object12 name="Object_30" />
                    <instances.Object13 name="Object_31" />
                    <group name="lpMaleG_41" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/computer-desk-area.glb");

export default ProjectComputer;
