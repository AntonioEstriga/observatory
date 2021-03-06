import { Component, Input, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ListTags } from '../../models/list-tags';

import { ScoreDistributionDialogComponent } from '../../dialog/score-distribution-dialog/score-distribution-dialog.component';
import { ErrorDistributionDialogComponent } from '../../dialog/error-distribution-dialog/error-distribution-dialog.component';
import { CorrectionDistributionDialogComponent } from '../../dialog/correction-distribution-dialog/correction-distribution-dialog.component';
import { ElementCorrectionDistributionDialogComponent } from "../../dialog/element-correction-distribution-dialog/element-correction-distribution-dialog.component";

@Component({
  selector: 'app-tags-statistics',
  templateUrl: './tags-statistics.component.html',
  styleUrls: ['./tags-statistics.component.scss']
})
export class TagsStatisticsComponent {

  @Input() listTags: ListTags;
  dialogWidth: string;
  thresholdConfig: any;

  constructor(private readonly dialog: MatDialog) {
    this.thresholdConfig = {
      0: {color: 'red'},
      2.5: {color: 'orange'},
      5: {color: 'yellow'},
      7.5: {color: 'green'}
    };

    if (window.innerWidth < 960) {
      this.dialogWidth = '100vw';
    } else {
      this.dialogWidth = '60vw';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth < 960) {
      this.dialogWidth = '100vw';
    } else {
      this.dialogWidth = '60vw';
    }
  }

  openScoreDistributionDialog(): void {
    this.dialog.open(ScoreDistributionDialogComponent, {
      data: {
        number: this.listTags.tags.length,
        frequency: this.listTags.frequencies
      },
      width: this.dialogWidth
    });
  }

  openErrorDistributionDialog(): void {
    this.dialog.open(ErrorDistributionDialogComponent, {
      data: {
        errors: this.listTags.getTopTenErrors(),
        isCat: true
      },
      width: this.dialogWidth
    });
  }
  
  openCorrectionDistributionDialog(): void {
    this.dialog.open(CorrectionDistributionDialogComponent, {
      data: {
        tags: this.listTags,
        inTagsPage: true
      },
      width: this.dialogWidth,
    });
  }

  openElementCorrectionDistributionDialog(): void {
    this.dialog.open(ElementCorrectionDistributionDialogComponent, {
      data: {
        tags: this.listTags,
        inTagsPage: true
      },
      width: this.dialogWidth,
    });
  }
}
