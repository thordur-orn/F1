import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'raceTime'})
export class RaceTimePipe implements PipeTransform{
    transform(duration: number){
        if(!duration){
            return '-'
        }
        var milliseconds = (duration % 1000);
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        
        let hoursStr = (hours < 10) ? "0" + hours : hours;
        let minutesStr = (minutes < 10) ? "0" + minutes : minutes;
        let secondsStr = (seconds < 10) ? "0" + seconds : seconds;
  
        return hoursStr + ":" + minutesStr + ":" + secondsStr + "." + milliseconds;
    }
}