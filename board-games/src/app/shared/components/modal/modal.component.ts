import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        if (!this.id) {
            console.error("The modal doesn't have an id");
            return;
        }

        document.body.appendChild(this.element);

        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'app-modal') {
                modal.close();
            }
        });

        this.modalService.add(this);
        this.element.style.display = 'none';
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    open(): void {
        this.element.style.display = "block";
        document.body.classList.add('app-modal-open');
    }

    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('app-modal-open');
    }

}
