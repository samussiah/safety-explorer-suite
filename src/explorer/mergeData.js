import adverseEvents from './mergeData/adverseEvents';
import medicalSigns from './mergeData/medicalSigns';

export default function mergeData() {
    if (this.dataArray.some(data => data.type === 'AE'))
        this.dataArray.push({
            type: 'AEs',
            'Data Standard': 'Analysis',
            raw: adverseEvents.call(
                this,
                this.dataArray.find(data => data.type === 'DM'),
                this.dataArray.find(data => data.type === 'AE')
            )
        });
    if (this.dataArray.some(data => data.type === 'BDS'))
        this.dataArray.push({
            type: 'Labs',
            'Data Standard': 'Analysis',
            raw: medicalSigns.call(
                this,
                this.dataArray.find(data => data.type === 'DM'),
                this.dataArray.filter(data => data.type === 'BDS')
            )
        });
}
