import React, {useMemo} from 'react'
import {
  Typography,
  makeStyles,
  Theme,
  Card,
  CardHeader,
  GridList,
  GridListTile,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import {SECOND, MINUTE, HOUR, DAY} from '../../utils'
import {GridListTileProps} from '@material-ui/core/GridListTile'

const unitMinWidth = 70
const unitSpacing = 1

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: theme.spacing(.5),
  },
  unitsContainer: {
    justifyContent: 'center',
  },
  unitContainer: {
    padding: theme.spacing(unitSpacing),
  },
  unit: {
    // height: '100%',
    // width: '100%',
    minWidth: unitMinWidth,
  },
  unitHeader: {
    padding: theme.spacing(0),
  },
  unitValue: {
    // margin: theme.spacing(.5),
  },
  unitTitle: {
    // margin: theme.spacing(.5),
  },
}))

export interface CountdownViewProps {
  countdown: number
  title?: string
  includeMilliseconds?: boolean
}

type Unit = {key: string, title: string, value: number} & Partial<GridListTileProps>
export function CountdownView(props: CountdownViewProps) {
  const {
    countdown,
    title,
    includeMilliseconds = false,
  } = props

  const theme = useTheme()
  const colSize = useMemo(() => unitMinWidth + theme.spacing(unitSpacing), [theme])
  const fitCols = [
    useMediaQuery(theme.breakpoints.up(colSize)),
    useMediaQuery(theme.breakpoints.up(colSize * 2)),
    useMediaQuery(theme.breakpoints.up(colSize * 3)),
    useMediaQuery(theme.breakpoints.up(colSize * 4)),
    useMediaQuery(theme.breakpoints.up(colSize * 5)),
  ]
  const maxCols = fitCols.lastIndexOf(true) + 1

  // useEffect(() => console.log(countdown), [countdown])
  const milliseconds = useMemo(() => countdown % SECOND, [countdown])
  const seconds = useMemo(() => Math.floor(countdown % MINUTE / SECOND), [countdown])
  const minutes = useMemo(() => Math.floor(countdown % HOUR / MINUTE), [countdown])
  const hours = useMemo(() => Math.floor(countdown % DAY / HOUR), [countdown])
  const days = useMemo(() => Math.floor(countdown / DAY), [countdown])
  const units = useMemo(() => {
    const units: Unit[] = [
      {key: 'days', title: 'days', value: days},
      {key: 'hours', title: 'hours', value: hours},
      {key: 'minutes', title: 'minutes', value: minutes},
      {key: 'seconds', title: 'seconds', value: seconds},
    ]

    if (includeMilliseconds) {
      units.push({
        key: 'milliseconds',
        title: 'milliseconds',
        value: milliseconds,
        cols: maxCols === 5 ? 1 : maxCols === 3 ? 2 : maxCols
      })
    }

    return units.slice(Math.min(units.findIndex(unit => unit.value !== 0), units.length - 1))
  }, [days, hours, includeMilliseconds, maxCols, milliseconds, minutes, seconds])

  const cols = useMemo(() => maxCols === 3 ? 2 : Math.min(maxCols, units.length), [maxCols, units.length])

  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      {title && (
        <Typography className={classes.title} variant='h5' component='div'>
          {title}
        </Typography>
      )}
      <GridList
        className={classes.unitsContainer}
        cellHeight='auto'
        spacing={0}
        cols={cols}
        style={{width: unitMinWidth * cols}}
      >
        {units.map(unit => {
          const {value, title, key, ...restProps} = unit

          return (
            <GridListTile key={key} className={classes.unitContainer} {...restProps}>
              <Card className={classes.unit} elevation={0}>
                <CardHeader
                  title={value}
                  subheader={title}
                  classes={{
                    root: classes.unitHeader,
                    title: classes.unitValue,
                    subheader: classes.unitTitle,
                  }}
                />
              </Card>
            </GridListTile>
          )
        })}
      </GridList>
    </div>
  )
}
