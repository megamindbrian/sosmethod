import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import {DiscoveryComponent} from '../discovery/discovery';
import {ActivatedRoute} from '@angular/router';
import {LayoutService} from '../../../services/layout';
import {AuthGuard} from "../../../guards/auth";
import {AuthUser} from "../../../models/auth-user";


@Component({
    selector: 'bc-mediation',
    templateUrl: './meditation.html',
    styleUrls: ['../discovery/discovery.scss']
})
export class MeditationComponent extends DiscoveryComponent implements OnInit {

    constructor(public route: ActivatedRoute, public layout: LayoutService, public auth: AuthGuard) {
        super(route, layout, auth);
    }

    ngOnInit() {
        const that = this;
        super.ngOnInit();
        this.series$.subscribe(d => {
            setTimeout(() => {
                this.auth.user.subscribe(u => {
                    that.circleStatus.apply(that, [u]);
                });
            });
        });
    }

    static isLocked(u: AuthUser, seriesUri: string) {
        if((seriesUri.indexOf('classic_calm') > -1 && seriesUri.indexOf('sweet_spot') > -1)
            || seriesUri.indexOf('classic_calm') > -1 && seriesUri.indexOf('calm_strength') > -1
            || seriesUri.indexOf('classic_calm') > -1 && seriesUri.indexOf('calm_strength') > -1
            || seriesUri.indexOf('elevate') > -1 && seriesUri.indexOf('believe') > -1) {
            return false;
        }
        return !u;

    }

    public circleStatus(u: AuthUser) {
        $(this.discoveryLeaf.nativeElement).find('a[href]').each((i, elem) => {
            const link = $(elem).attr('href').replace('#/', '');
            if(MeditationComponent.isLocked(u, link)) {
                $(elem).addClass('locked');
            } else {
                $(elem).removeClass('locked');
            }
        })
    }
}


