/******************************************************************************
     Copyright:: 2020- IBM, Inc

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 *****************************************************************************/

import { RuleContextHierarchy } from "../../../api/IEngine";

export class AncestorUtil {
    public static isPresentationFrame(contextHierarchy: RuleContextHierarchy) : boolean {
        if (contextHierarchy && contextHierarchy.dom) {
            // Skip current node because we want ancestry
            for (let idx=contextHierarchy.dom.length-2; idx >= 0; --idx) {
                const elem = (contextHierarchy.dom[idx].node as HTMLElement);
                if (elem.nodeType === 1 && elem.getAttribute("role") === "presentation" || elem.getAttribute("aria-hidden") === "true") {
                    return true;
                }
            }
        }
        return false;
    }

    public static getOwnerFragment(node: Node) : Document | DocumentFragment {
        let n : Node = node;
        while(n.parentNode && (n = n.parentNode)){
            if (n.nodeType === 11) {
                return n as DocumentFragment;
            }
        }
        return node.ownerDocument;
    }
}