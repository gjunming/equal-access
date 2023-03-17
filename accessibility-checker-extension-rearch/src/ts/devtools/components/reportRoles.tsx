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

import * as React from 'react';
import { IReport } from '../../interfaces/interfaces';
import { ReportTreeGrid, IRowGroup } from './reportTreeGrid';
import { UtilIssue } from '../../util/UtilIssue';
import { ePanel } from '../devToolsApp';

import "./reportSection.scss";

interface ReportProps {
    panel: ePanel
    report: IReport | null
    checked: {
        "Violation": boolean,
        "Needs review": boolean,
        "Recommendation": boolean
    }
    selectedPath: string | null;
}

export class ReportRoles extends React.Component<ReportProps> {
    render() {
        let rowData : IRowGroup[] | null = null;
        if (this.props.report && this.props.report.results) {
            rowData = [];
            for (const result of this.props.report.results) {
                // let thisLabel = result.path.aria.replace(/\//g, "/ ").replace(/^\/ /, "/");
                let thisLabel = result.path.aria.replace(/\//g, " /");
                let curGroup = rowData.find(group => group.label === thisLabel);
                if (!curGroup) {
                    curGroup = {
                        id: ReportTreeGrid.cleanId(thisLabel),
                        label: thisLabel,
                        children: [result]
                    }
                    rowData.push(curGroup);
                } else {
                    curGroup.children.push(result);
                }
            }
            rowData.sort((groupA, groupB) => groupA.label.localeCompare(groupB.label));
            for (const group of rowData) {
                group.children.sort((a, b) => UtilIssue.valueToOrder(a.value)-UtilIssue.valueToOrder(b.value));
            }
        }
        return <ReportTreeGrid 
            panel={this.props.panel}
            emptyLabel="No issues detected for the chosen filter criteria"
            noScanMessage={<>This page has not been scanned.</>}
            headers={[
                { key: "issueCount", label: "Issues" },
                { key: "label", label: "Element Roles" }
            ]}
            rowData={rowData}
            selectedPath={this.props.selectedPath}
        />
    }
}